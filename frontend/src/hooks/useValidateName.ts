export default function useValidateName(_: any, value: string) {
  if (!value || value.trim() === '') {
		return Promise.reject(new Error('文件夹名称不能为空'));
	}
	// 禁止的特殊字符
	const forbiddenChars = /[\\/*?"|]/;
	if (forbiddenChars.test(value)) {
		return Promise.reject(new Error('不能包含 \\ / * ? " | 等特殊字符'));
	}
	// 检查开头和结尾是否有空格
	if (value !== value.trim()) {
		return Promise.reject(new Error('名称开头或结尾不能有空格'));
	}
	return Promise.resolve();
}