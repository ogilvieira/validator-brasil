const UF_LIST = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MS','MT','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

const isUF = ( value: string | number ): boolean => {
  value = (''+value).replace(/[\.\-\/]+/g, "").toUpperCase();
  if (value == "" || value.length !== 2) { return false };

  return UF_LIST.includes(value);
}


export default isUF;
