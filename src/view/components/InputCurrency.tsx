import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator='.'
      decimalSeparator=','
      className='w-full text-gray-800 text-[32px] outline-none font-bold tracking-[-1px]'
      defaultValue='0'
    />
  );
}
