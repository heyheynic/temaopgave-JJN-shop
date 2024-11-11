# 11 nov
==*(Nicole here)*== 
I have set up some custom colours, fluid font sizes and fluid spacing inside `:root`, and some custom component styling within `@layer components{}`inside `global.css`. If you want to see exactly what specs the colours, spacing and fonts have, I advise you to look through `:root{}`.

**I will go through how `@layer components{}` work further down and how I have created a theme for the `PrimaryButton`.**

**Here is a quick overview :**
	In `:root`there have been defined variables for colours, font sizes and spacing. These have later on been added to `tailwind.config.js`, under color, fontSize and spacing. 

This is what you should see in `tailwind.config.js`:
```js 
colors: {
	background: "var(--background)",
	foreground: "var(--foreground)",
	black: "var(--foreground)",
	white: "var(--white-smoke)",
	dark: "var(--ebony)",
	medium: "var(--ecru)",
	accent: "var(--redwood)",
	secondary: "var(--blue-munsell)",
},

fontSize: {
	normal: "var(--text)",
	emphasize: "var(--emphasize)",
	"sub-subtitle": "var(--sub-subtitle)",
	subtitle: "var(--subtitle)",
	title: "var(--title)",
	"big-title": "var(--big-title)",
},

spacing: {
	"3xs": "var(--space-3xs)",
	"2xs": "var(--space-2xs)",
	xs: "var(--space-xs)",
	s: "var(--space-s)",
	m: "var(--space-m)",
	l: "var(--space-l)",
	xl: "var(--space-xl)",
	"2xl": "var(--space-2xl)",
},
```

You will be able to access these when you type your tailwind as normal. 

**Colors:**
For example, if you want to use the color "accent", you can type it like this: `text-accent`, `bg-accent`, `border-accent` and any other instance where one is able to select a colour. 

**Font-sizes:**
They are a bit of a WIP at the moment, since the line-height easily gets a bit messed up. Here is a link for me to remember tomorrow: (https://tailwindcss.com/docs/font-size)
However, you can still use it as intended. For a paragraph text, type `text-normal`, for a title(h1), type `text-title`, subtitle (h2) `text-subtitle`. 

**Spacing:**
By default the spacing scale is inherited by the `padding`, `margin`, `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`, `gap`, `inset`, `space`, `translate`, `scrollMargin`, and `scrollPadding` core plugins.


## `@layer components{}` and `PrimaryButton.jsx`

`@layer components` is inside of `globals.css`. What we have there as of right now looks like this:
```js
@layer components {
	.btn {
		@apply py-2xs px-xs w-fit rounded-md hover:bg-black hover:text-white drop-shadow-lg active:bg-dark active:text-white text-white text-nowrap;
	}
}
```
This is the place where we can add custom styling to a `className` in Tailwind. This is similar to styling a class used in a HTML-element in classic CSS. 

In this instance I'm targeting the className `.btn` where I give it the overall styling by writing `@apply` before the wall of tailwind text. 

What we can do with this is to use `.btn` inside an element on a page/component.

Here is my PrimaryButton.jsx: Let's just ignore the `const themes` for now.
```
const PrimaryButton = ({ btnText, theme = "default" }) => {
	const themes =
		theme === "red"
		? "bg-accent "
		: theme === "white"
		? "bg-white text-black outline outline-2 hover:outline-none"
		: theme === "black"
		? "bg-black"
		: "bg-dark "; // default
		return (
			<div className={`btn text-normal ${themes}`}>
				{btnText}
			</div>
	);
};
export default PrimaryButton;
```

Inside `className`there is something called `btn`, and that is what carries the styling from `@layer components`. 

Now onto the theme-setup!
The `theme` prop used allows different styling (e.g., `red`, `white`, `black`, or `default`). I don't know if this is the easiest way of doing it, but I believe it is somewhat intuitive enough. It's default theme is set to the colour `dark`. If you want to use a similar set-up to create your own theme in your components, you can use this method. You will just have to set which theme in you want when using the component if it is other than default.

For example: 
```js
	<PrimaryButton btnText="Go to products" theme="red" />
```

---
