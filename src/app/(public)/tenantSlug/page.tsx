import { headers } from "next/headers";

export default async function Home() {
    const headersList = await headers();
    const host = headersList.get('host');



    return (
        <div>
            <h1>Host: {host}</h1>
            <p>Tenant bio</p>
        </div>
    )
}