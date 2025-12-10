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
  const sig = hashToSig(`${petName}-${safeBreed}-${mbtiType}`)
  const keywords = `${encodeURIComponent('dog')},${encodeURIComponent(safeBreed)}`
  return `https://loremflickr.com/400/400/${keywords}?lock=${sig}`
}
