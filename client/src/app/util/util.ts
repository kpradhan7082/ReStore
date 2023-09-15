export const getCookie = function (name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export const getItemPrice = function (price: number) {
  return "$" + (price / 100).toFixed(2)
}