import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FileText, UploadCloud, Download, AlertCircle } from "lucide-react";
import { profileApi } from "../../services/apiServices";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

function Resume() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let active = true;
    profileApi
      .get()
      .then((res) => {
        if (!active) return;
        setResumeUrl(res.data.data?.resume || "");
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || "Failed to load resume");
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const upload = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await profileApi.updateResume(formData);
      setResumeUrl(res.data.data?.resume || res.data.resume || "");
      toast.success("Resume updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    upload(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold">Resume</h1>
        <p className="text-sm text-muted mt-1">
          Upload the PDF visitors can view and download from your public Resume page.
        </p>
      </div>

      <Card className="p-8">
        {loading ? (
          <Loader text="Loading resume..." />
        ) : error ? (
          <EmptyState icon={AlertCircle} title="Failed to load" description={error} />
        ) : (
          <div className="space-y-6">
            {resumeUrl ? (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/40">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">Current resume</div>
                  <div className="text-sm text-muted truncate">{resumeUrl}</div>
                </div>
                <a href={resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="icon" title="Download">
                    <Download className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            ) : (
              <EmptyState icon={FileText} title="No resume uploaded yet" description="Upload a PDF to make it available on your public site." />
            )}

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <UploadCloud className={`w-8 h-8 ${uploading ? "animate-bounce text-primary" : "text-muted"}`} />
              <div>
                <p className="font-medium text-foreground">
                  {uploading ? "Uploading..." : "Click to upload or drag a PDF here"}
                </p>
                <p className="text-sm text-muted mt-1">PDF only, replaces the current resume.</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => upload(e.target.files?.[0])}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Resume;