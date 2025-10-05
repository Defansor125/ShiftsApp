export async function apiGet<T>(url: string) Promise<T> {
    const res = await fetch(url)
    
}