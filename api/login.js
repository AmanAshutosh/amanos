export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { mobile } = req.body;

  // create a fake user id for now
  const userId = mobile + "_user";

  res.status(200).json({
    userId: userId,
  });
}
