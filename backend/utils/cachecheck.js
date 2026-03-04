async function checkCache(domain) {
  const cached = await Problem.findOne({ domain });
  return cached;
}