// http://localhost:3000/api/routes/example

export async function GET(req) {
  try {
    return Response.json({"Hello": "world"});
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
