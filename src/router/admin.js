import Info from '@/components/admin/Info';
import Index from '@/pages/admin/Index';
import New from '@/pages/admin/New';
import Products from '@/pages/admin/Products';
import Edit from '@/pages/admin/Edit';
import View from '@/pages/admin/View';

import Orders from '@/pages/admin/Orders';

export default {
	path: '/admin',
	component: Index,
	meta: {
		requiresAuth: true,
		admin: true
	},
	children: [
		{
			path: '',
			name: 'Info',
			component: Info
		},
		{
			path: 'new',
			name: 'New',
			component: New
		},
		{
			path: 'products',
			name: 'Products',
			component: Products
		},
		{
			path: 'orders',
			name: 'AdminOrders',
			component: Orders
		},
		{
			path: 'edit/:id',
			name: 'Edit',
			component: Edit
		},
		{
			path: 'view/:id',
			name: 'View',
			component: View
		}
	]
}