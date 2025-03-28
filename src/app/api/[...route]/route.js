export async function GET(request, { params }) {
    // Отримуємо шлях з URL (/api/proxy/xxx → ['xxx'])
    const routeSegments = params.route || [];
    
    // Формуємо URL до бекенду
    const backendUrl = new URL(
      `${process.env.BACKEND_URL}/api/${routeSegments.join('/')}`
    );
  
    // Додаємо оригінальні query-параметри
    const searchParams = new URL(request.url).searchParams;
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });
  
    try {
      const res = await fetch(backendUrl, {
        headers: request.headers
      });
      
      const data = await res.json();
      return Response.json(data);
    } catch (error) {
      return Response.json(
        { error: "Backend connection failed" },
        { status: 502 }
      );
    }
  }