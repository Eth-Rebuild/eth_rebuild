import { Button } from "antd";

export function Landing() {
  return (
    <div>
      <h1>Welcome to ethRebuild!</h1>
      <h1>This landing page is super ugly, but alas here we are.</h1>
      <Button
        type="primary"
        onClick={() => {
          window.location.href = "/create";
        }}
      >
        Create a new build
      </Button>
    </div>
  );
}
