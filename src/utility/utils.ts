export async function apiJson<T>(url: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    const res = await fetch(url, { ...init, headers });

    if (!res.ok) {
        const msg = await res.text().catch(() => "");
        const err: any = new Error(`${init.method ?? "GET"} ${url} -> ${res.status} ${msg}`);
        err.status = res.status;
        err.url = url;
        err.method = init.method ?? "GET";
        throw err;
    }

    if (res.status === 204) return undefined as T;

    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) return undefined as T;

    return (await res.json()) as T;
}