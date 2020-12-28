<template>
	<div>
		<b-button variant="primary" @click="print">Download PDF</b-button>
	</div>
</template>

<script>
import { jsPDF } from 'jspdf'


export default {
	props: ['date', 'status'],
	methods: {
		print() {
			const doc = new jsPDF();
			const orders = this.$store.getters.allOrders
			let summary = []
			doc.setFontSize(20)
			doc.text(this.status+" Orders for "+this.date.toDateString(), 10, 20);
			doc.setFontSize(10)
			let y = 25
			let product = {}
			
			orders.forEach(order => {
				product = this.$store.getters.productById(order.productID)

				product.price = order.amount/order.quantity

				summary.push({
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: order.quantity
				})
				// pageHeight= doc.internal.pageSize.height;
				if(y > 200) {
					doc.addPage()
					y = 0
				}
				doc.text('ORDER ID: '+order.id.substr(0,4).toUpperCase(), 10, y+10)
				doc.text(product.name, 10, y+20)
				doc.text(order.quantity+'Kg X Rs.'+product.price, 80, y+20)
				doc.setFontSize(16)
				doc.text('Rs '+order.amount, 120, y+20)
				doc.setFontSize(10)
				doc.text(''+this.$store.getters.username(order.userID), 10, y+30)
				doc.text('Quarter No. ' + this.$store.getters.address(order.userID), 10, y+36)
				doc.text('Mobile No. ' + this.$store.getters.phone(order.userID), 80, y+36)
				y = y+40
			});

			summary = summary.reduce((acc, cur) => {
					const existType = acc.find(a => a.id === cur.id);
					if (existType) {
							existType.quantity += +cur.quantity;
							return acc;
					}
					acc.push({
							id: cur.id,
							name: cur.name,
							price: cur.price,
							quantity: +cur.quantity
					});
					return acc;
			}, []);

			y+=20
			doc.setFontSize(20)
			doc.text('Summary', 10, y)
			doc.setFontSize(10)
			y+=10

			let total = 0
			summary.forEach(product => {
				if(y > 200) {
					doc.addPage()
					y = 0
				}
				doc.text(product.name, 10, y)
				doc.text(product.quantity+' Kg', 50, y)
				doc.text('X Rs. '+product.price, 65, y)
				doc.text(''+product.quantity*product.price , 100, y)
				total += product.quantity*product.price
				y = y+10
			})
			doc.setFontSize(20)
			doc.text('Total', 80, y)
			doc.text(''+total, 100, y)
			doc.setFontSize(10)

			doc.save("FreshFishOrders.pdf");
		}
	}
}
</script>