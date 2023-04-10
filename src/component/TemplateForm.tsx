import { Checkbox } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

interface TemplateFromProps {
  setMessage: (message: string) => void;
}

export const TemplateForm: FC<TemplateFromProps> = memo(({ setMessage }) => {
  const template = `#命令書：
あなたは、〇〇です。
以下の制約条件と入力文をもとに、〇〇を出力してください

#制約条件：
・文字数は〇〇文字程度。
・小学生にもわかりやすく。
・重要なキーワードは取り残さない。
・文章を簡潔に。
#入力文：
<ここに入力文章>
#出力文：`;
  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(template);
  };
  return <Checkbox onChange={handleOnCheck}>Templae</Checkbox>;
});
