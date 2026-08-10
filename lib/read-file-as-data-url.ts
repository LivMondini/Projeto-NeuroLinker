/**
 * Reads a File (e.g. from an <input type="file"> upload) and resolves with
 * a base64 data URL that can be used directly as an <img src>.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Não foi possível ler o arquivo."))
      }
    }
    reader.onerror = () => reject(reader.error ?? new Error("Erro ao ler o arquivo."))
    reader.readAsDataURL(file)
  })
}
