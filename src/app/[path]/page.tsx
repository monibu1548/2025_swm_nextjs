// app/[path]/page.tsx
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ path: string }> }) {
    const params = await props.params;

    if (!params || !params.path) {
        redirect("/");
    }

    const response = await fetch(
        `https://zksnirpbgoppgoprlfdw.supabase.co/functions/v1/api/shortPath/v1/shortPath?shortPath=${params.path}`
    );

    if (!response.ok) {
        throw new Error("API 호출에 실패했습니다.");
    }

    const data = await response.json();
    const { redirectURL } = data;

    if (redirectURL) {
        redirect(redirectURL);
    } else {
        redirect("/");
    }
}