export function getDogImageUrl(petName: string, breed: string, mbtiType: string): string {
  const dev = import.meta.env.DEV
  const safeBreed = breed || 'dog'
  if (dev) {
    const prompt = encodeURIComponent(`可爱${petName}，犬种：${safeBreed}，${mbtiType}型狗狗卡通形象，温暖色调，手绘风格`)
    return `https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square_hd`
  }
  const unsplashQuery = encodeURIComponent(`dog,${safeBreed}`)
  return `https://source.unsplash.com/400x400/?${unsplashQuery}`
}
