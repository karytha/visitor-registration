export const apiUrl = 'http://localhost:3001';

export async function apiGet(path: string, token: string) {
    const res = await fetch(`${apiUrl}${path}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
}

export async function apiPost(path: string, body: any, token?: string) {
    const res = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
    });
    return res.json();
}

export async function apiPatch(path: string, body: any, token: string) {
    const res = await fetch(`${apiUrl}${path}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    return res.json();
}
