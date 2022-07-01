// This function run when URL = "/api/new-meetup"

// If "/api/new-meetup" Receives a "POST" request
const handler = (req, res) => {
  if (req.method === "POST") {
    const data = req.body; // Get data

    const { title, image, address, description } = data;
  }
};

export default handler;
