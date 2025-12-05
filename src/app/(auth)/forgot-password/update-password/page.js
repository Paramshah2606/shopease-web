import { Suspense } from "react";
import UpdatePassword from './updatepassword'; // move your logic into this component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword />
    </Suspense>
  );
}