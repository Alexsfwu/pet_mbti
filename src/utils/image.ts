function hashToSig(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function getDogImageUrl(petName: string, breed: string, mbtiType: string): string {
  const safeBreed = (breed || 'dog').trim()
  const query = encodeURIComponent(`dog,${safeBreed}`)
  const sig = hashToSig(`${petName}-${safeBreed}-${mbtiType}`)
  return `https://source.unsplash.com/400x400/?${query}&sig=${sig}`
}
