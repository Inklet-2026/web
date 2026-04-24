export type RoomId = 'livingroom' | 'bedroom' | 'bedroom2' | 'bathroom'

export interface Anchor {
  position: [number, number, number]
  quaternion: [number, number, number, number]
}

export interface Room {
  id: RoomId
  label: string
  color: string
  view: Anchor
  inklet: Anchor
}

export interface AnchorsFile {
  rooms: Room[]
}
