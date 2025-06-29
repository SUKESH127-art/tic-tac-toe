/** @format */

import { useState } from "react";

export default function Product() {
	const [filterText, setFilterText] = useState("");
	const [inStockOnly, setInStockOnly] = useState(false);

	const jsonApiResult = [
		{ category: "Fruits", price: "$1", stocked: true, name: "Apple" },
		{ category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
		{ category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
		{ category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
		{ category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
		{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
	];

	return (
		<>
			<SearchBar
				filterText={filterText}
				inStockOnly={inStockOnly}
				onFilterTextChange={setFilterText}
				onInStockOnlyChange={setInStockOnly}
			/>
			<ProductTable
				products={jsonApiResult}
				filterText={filterText}
				inStockOnly={inStockOnly}
			/>
		</>
	);
}

export function SearchBar({ filterText, inStockOnly }) {
	return (
		<>
			<form>
				<input
					type="text"
					value={filterText}
					placeholder="Search..."
					onChange={(e) => {
						onFilterTextChange(e.target.value);
					}}
				/>
				<label>
					<div></div>
					<input
						type="checkbox"
						checked={inStockOnly}
						onChange={(e) => {
							onInStockOnlyChange(e.target.value);
						}}
					/>{" "}
					Only show products in stock
				</label>
			</form>
		</>
	);
}

export function ProductTable({ products, filterText, inStockOnly }) {
	const rows = [];
	let lastCategory = null;

	products.forEach((product) => {
		const category = product.category;
		if (category !== lastCategory) {
			// start the new category
			rows.push(<ProductCategoryRow key={category} category={category} />);
		}
		rows.push(<ProductRow key={product.name} product={product} />);
		lastCategory = category;
	});

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</>
	);
}

export function ProductCategoryRow({ category }) {
	return (
		<>
			<tr>
				<th colSpan="2">{category}</th>
			</tr>
		</>
	);
}

export function ProductRow({ product }) {
	const name = product.stocked ? (
		product.name
	) : (
		<span style={{ color: "red" }}>{product.name}</span>
	);
	return (
		<>
			<tr>
				<td>{name}</td>
				<td>{product.price}</td>
			</tr>
		</>
	);
}
