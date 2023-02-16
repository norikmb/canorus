import { Message } from "discord.js";

export const codeHighlight = async (message: Message<boolean>) => {
	const url = message.content;
	const newurl = url.replace(
		/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i,
		"$1raw$2",
	);
	const paragraph = url.split("#");
	if (paragraph[1] == null) {
		console.log("Where you want to display is not existing.");
		return;
	}
	const res = await fetch(newurl);
	const data = await res.text();
	const lines = data.split("\n");
	// 拡張子を取得
	const fileType = paragraph[0].split("/").slice(-1)[0].split(".").slice(-1)[0];
	const LineNumber = paragraph[1].split("-");
	// 行始めと行終わりを取得
	let sendtext = "";
	if (LineNumber.length === 2) {
		const begin = Number(LineNumber[0].substring(1)) - 1;
		const end = Number(LineNumber[1].substring(1));
		sendtext = lines.slice(begin, end).join("\n");
	} else if (LineNumber.length === 1) {
		const begin = Number(LineNumber[0].substring(1)) - 1;
		sendtext = lines.slice(begin, begin + 1).join("\n");
	} else {
		console.log("error");
		return;
	}
	// テンプレートリテラル
	return `\`\`\`${fileType}\n${sendtext}\`\`\``;
};
