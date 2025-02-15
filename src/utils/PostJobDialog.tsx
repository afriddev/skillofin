import { useForm } from "react-hook-form";
import AppDialog from "@/utiles/AppDilaog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FaAsterisk } from "react-icons/fa";
import { usePostJob } from "@/hooks/userHooks";

interface PostJobDialogInterface {
  onClose: () => void;
}

interface JobPostFormValues {
  title: string;
  description: string;
  costPerHour: number;
  level: "basic" | "fluent" | "intermediate" | "native";
  contractAmount: number;
  skills: string; // Comma-separated skills (will be converted to an array)
}

function PostJobDialog({ onClose }: PostJobDialogInterface) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostFormValues>();
  const { isPending, postJob } = usePostJob();

  const onSubmit = (data: JobPostFormValues) => {
    // Transform the comma-separated skills string into an array
    const skillsArray = data.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
    const formData = { ...data, skills: skillsArray };

    postJob(formData);

    // onClose();
  };

  return (
    <AppDialog
      onClose={onClose}
      title="Post a Job"
      className="h-[90vh]"
      startFromRight
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
        {/* Job Title */}
        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Job Title
          </label>
          <Input
            mandatory
            id="title"
            placeholder="Enter job title"
            {...register("title", { required: "Job title is required" })}
            errorMessage={errors?.title?.message}
          />
        </div>

        {/* Job Description */}
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-foreground"
          >
            Job Description
          </label>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <div className="flex items-center gap-2">
              <Textarea
                className="h-[10vh]"
                placeholder="Job Description"
                {...register("description", {
                  required: "Please enter Description",
                })}
              />
              <div className="h-2 w-2">
                <FaAsterisk className="text-destructive h-2 w-2" />
              </div>
            </div>
            <div className="h-4 text-destructive ml-2 text-[12px]">
              {errors?.description?.message as string}
            </div>
          </div>
        </div>

        {/* Cost Per Hour */}
        <div className="space-y-1">
          <label
            htmlFor="costPerHour"
            className="block text-sm font-medium text-foreground"
          >
            Cost Per Hour (USD)
          </label>
          <Input
            id="costPerHour"
            type="number"
            placeholder="Cost per hour"
            iconName="dlr"
            {...register("costPerHour", {
              required: false,
            })}
          />
        </div>

        {/* Contract Amount */}
        <div className="space-y-1">
          <label
            htmlFor="contractAmount"
            className="block text-sm font-medium text-foreground"
          >
            Contract Amount (USD)
          </label>
          <Input
            id="contractAmount"
            type="number"
            placeholder="Enter contract amount"
            iconName="dlr"
            {...register("contractAmount", {
              required: false,
            })}
          />
        </div>

        {/* Skills Required */}
        <div className="space-y-1">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-foreground"
          >
            Skills Required
          </label>
          <Input
            id="skills"
            placeholder="Enter skills separated by commas"
            {...register("skills", { required: false })}
          />
        </div>

        <div className="flex justify-end">
          <Button isPending={isPending} type="submit">
            Post Job
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}

export default PostJobDialog;
