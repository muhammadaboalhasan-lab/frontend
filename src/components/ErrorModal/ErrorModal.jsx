import { AlertCircle } from "lucide-react";
import { useWorkout } from "@/hooks/useWorkout";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { errorModalStyle as s } from "./errorModalStyle";

function ErrorModal() {
  const { error, setError } = useWorkout();
  const close = () => setError(null);

  return (
    <Modal
      open={!!error}
      onClose={close}
      title="Something went wrong"
      footer={
        <Button variant="outline" onClick={close}>
          Dismiss
        </Button>
      }
    >
      <div className={s.content}>
        <span className={s.iconWrap}>
          <AlertCircle className="size-5" />
        </span>
        <p className={s.message}>{error}</p>
      </div>
    </Modal>
  );
}

export default ErrorModal;
