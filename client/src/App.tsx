import { Toaster } from "sonner";
import RConfigForm from "./forms/r-configuration-form/RConfigForm";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <AppLayout>
      <Toaster richColors position="top-right" />
      <RConfigForm />
    </AppLayout>
  );
};

export default App;
