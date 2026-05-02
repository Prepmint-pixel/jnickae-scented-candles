import { useGetDocuments } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Files, Upload, FileText, Download, Trash2, Calendar, FileBox } from "lucide-react";
import { formatBytes } from "@/lib/utils";

export default function Documents() {
  const { data, isLoading } = useGetDocuments();

  const folders = [
    { id: "all", label: "All Files" },
    { id: "credit_reports", label: "Credit Reports" },
    { id: "disputes", label: "Disputes" },
    { id: "identity_docs", label: "Identity" },
    { id: "letters", label: "Letters" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Files className="w-8 h-8 text-primary" />
              Document Center
            </h1>
            <p className="text-muted-foreground mt-1">Securely store and organize your financial documents.</p>
          </div>
          <Button className="bg-primary shadow-lg shadow-primary/20">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted/50 p-1 w-full justify-start overflow-x-auto border border-border/50">
            {folders.map(f => (
              <TabsTrigger key={f.id} value={f.id} className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))
              ) : data?.documents && data.documents.length > 0 ? (
                data.documents.map((doc) => (
                  <Card key={doc.id} className="border-border/50 bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-md transition-all group">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate" title={doc.fileName}>{doc.fileName}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                            <span className="capitalize px-1.5 py-0.5 bg-muted rounded">{doc.folder.replace('_', ' ')}</span>
                            <span>{formatBytes(doc.fileSize || 0)}</span>
                          </div>
                          <div className="flex items-center text-[10px] text-muted-foreground/80 mt-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-3 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="sm" className="w-full text-xs h-8">
                          <Download className="w-3 h-3 mr-1" /> Download
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-border/50 rounded-2xl bg-card/30">
                  <FileBox className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6 text-sm">
                    Upload credit reports, proof of identity, or dispute letters to keep everything in one secure place.
                  </p>
                  <Button variant="outline" className="bg-background/50">Browse Files</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Other tab contents would filter the data based on folder */}
          {folders.slice(1).map(f => (
            <TabsContent key={f.id} value={f.id} className="mt-6">
              <div className="text-center py-20 text-muted-foreground border border-dashed border-border/50 rounded-xl">
                Filter logic applied here.
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
