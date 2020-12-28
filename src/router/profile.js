import Index from '@/pages/profile/Index';
import View from '@/pages/profile/View';
import Edit from '@/pages/profile/Edit';

export default {
	path: '/profile',
	component: Index,
	children: [
		{
			path: '',
			component: View
		},
		{
			path: 'edit',
			component: Edit
		}
	]
}