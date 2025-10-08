export interface CarFormProps {
    onSubmit: (name: string, color: string) => void;
    buttonLabel?: string;
    initialName?: string;
    initialColor?: string;
  }