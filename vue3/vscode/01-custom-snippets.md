# VSCode Custom Snippets

## `console.log`

```
{
	// Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
}
```

## Vue 컴포넌트
```
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Vue Component": {
		"prefix": "vcomp",
		"body": [
			"<template>",
			"  <div>",
			"    ${1}",  
			"  </div>",
			"</template>",
			"",
			"<script setup>",
			"",
			"</script>",
			"",
			"<style lang='scss' scoped>",
			"",
			"</style>"
		],
		"description": "Create a Vue component with <script setup>"
	}
}
```

## 참고

---

https://code.visualstudio.com/docs/editor/userdefinedsnippets

https://snippet-generator.app/