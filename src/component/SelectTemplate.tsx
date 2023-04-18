import { Checkbox, Select } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';

interface SelectTemplateProps {
  setMessage: (message: string) => void;
}

export const SelectTemplate: FC<SelectTemplateProps> = memo(
  ({ setMessage }) => {
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

    const templateList = [
      {
        name: 'template',
        value: template,
      },
    ];

    const handleOnSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(template);
    };
    return (
      <Select placeholder="Load a preset" onChange={handleOnSelectChange}>
        {templateList.map((template) => (
          <option value={template.value} key={template.name}>
            {template.name}
          </option>
        ))}
      </Select>
    );
  }
);
