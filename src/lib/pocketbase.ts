import PocketBase from 'pocketbase'

const pb: PocketBase = new PocketBase(import.meta.env.VITE_PB_URL)
export default pb
