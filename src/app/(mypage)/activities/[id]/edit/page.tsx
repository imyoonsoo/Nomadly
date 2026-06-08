import ActivityForm from "@/features/activity-form/components/ActivityForm";
import { mockActivityDetailData } from "@/features/activity-form/mock";

const EditActivityForm = async () => {
  return <ActivityForm mode="edit" defaultValues={mockActivityDetailData} />;
};

export default EditActivityForm;
