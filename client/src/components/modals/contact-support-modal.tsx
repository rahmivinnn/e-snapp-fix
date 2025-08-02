import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Headphones } from "lucide-react";
import { useForm } from "react-hook-form";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const userId = "demo-user-1"; // In a real app, this would come from auth context

interface FormData {
  subject: string;
  message: string;
}

export default function ContactSupportModal({ 
  isOpen, 
  onClose,
  onOpen 
}: ContactSupportModalProps) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const submitSupportMutation = useMutation({
    mutationFn: (data: FormData & { userId: string; subject: string }) =>
      apiRequest("POST", "/api/support/contact", data),
    onSuccess: () => {
      toast({
        title: "Support request sent",
        description: "We'll get back to you soon!",
        duration: 3000,
      });
      reset();
      setSubject("");
      onClose();
    },
    onError: () => {
      toast({
        title: "Failed to send support request",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!subject) {
      toast({
        title: "Please select a subject",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    submitSupportMutation.mutate({
      ...data,
      subject,
      userId,
    });
  };

  // Make onOpen available globally for menu access
  useEffect(() => {
    (window as any).showContactSupport = onOpen;
  }, [onOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Contact Support
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Billing Issue</SelectItem>
                <SelectItem value="technical">Technical Problem</SelectItem>
                <SelectItem value="account">Account Question</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea
              {...register("message", { 
                required: "Message is required",
                minLength: { value: 10, message: "Message must be at least 10 characters" }
              })}
              rows={4}
              placeholder="Describe your issue or question..."
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={submitSupportMutation.isPending}
            >
              {submitSupportMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
