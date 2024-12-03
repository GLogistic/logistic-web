import { Users } from "@/components/users";
import { Suspense } from "react";

const Page = () => (
    <Suspense>
        <Users/>
    </Suspense>
);

export default Page;