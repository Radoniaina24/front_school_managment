type Classe = {
  _id: string;
  level: string;
};
export default interface Student {
  photo: File | string;
  _id: string;
  name: string;
  first_name: string;
  gender: string;
  date_of_birth: string;
  classe: any;
  address: string;
  phone: string;
  mail: string;
  mother_name: string;
  mother_occupation: string;
  mother_phone: string;
  father_name: string;
  father_occupation: string;
  father_phone: string;
  submission: string;
}
