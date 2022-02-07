interface Station {
  id?: number,
  name: string,
  address?: string,
  wastes: string[],
  delivery?: string,
  rating?: number,
  payment?: string,
  hours?: string,
  image?: string,
  location: number[],
  email?: string,
  phone?: string,
  questions? :string[]
}



export default Station;