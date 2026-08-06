const parseBoolean = (value) => {
  if (value === true || value === "true" || value === "1") return true;
  if (value === false || value === "false" || value === "0") return false;
  return undefined;
};

export const paginateOptions = (query = {}) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildFilters = (
  query = {},
  filterable = [],
  { booleanFields = [] } = {}
) => {
  const filters = {};

  for (const key of filterable) {
    const value = query[key];

    if (value === undefined || value === null || value === "") continue;

    if (booleanFields.includes(key)) {
      const bool = parseBoolean(value);

      if (bool !== undefined) filters[key] = bool;

      continue;
    }

    if (typeof value === "string" && value.includes(",")) {
      filters[key] = { $in: value.split(",") };
    } else {
      filters[key] = value;
    }
  }

  return filters;
};

export const buildSearch = (query = {}, searchable = []) => {
  const term =
    typeof query.search === "string" ? query.search.trim() : "";

  if (!term || searchable.length === 0) return {};

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return {
    $or: searchable.map((field) => ({
      [field]: { $regex: escaped, $options: "i" },
    })),
  };
};

export const buildSort = (query = {}, sortable = {}) => {
  const raw = typeof query.sort === "string" ? query.sort : "";
  const sort = {};

  for (const part of raw.split(",").filter(Boolean)) {
    const field = part.startsWith("-") ? part.slice(1) : part;
    const direction = part.startsWith("-") ? -1 : 1;

    if (sortable[field]) sort[field] = direction;
  }

  if (Object.keys(sort).length === 0) sort.createdAt = -1;

  return sort;
};

export const getPagination = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export const paginate = async (Model, query = {}, options = {}) => {
  const { page, limit, skip } = paginateOptions(query);

  const filter = {
    ...buildFilters(query, options.filterable || [], {
      booleanFields: options.booleanFields || [],
    }),
    ...buildSearch(query, options.searchable || []),
  };

  const sort = buildSort(query, options.sortable || {});

  const [data, total] = await Promise.all([
    Model.find(filter).sort(sort).skip(skip).limit(limit),
    Model.countDocuments(filter),
  ]);

  return { data, pagination: getPagination(total, page, limit) };
};
