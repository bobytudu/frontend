import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Rating,
	Box,
	CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		price: number;
		image: string;
		rating: number;
		reviews: number;
		brand: string;
	};
}

export default function ProductCard({ product }: ProductCardProps) {
	const navigate = useNavigate();

	return (
		<Card>
			<CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
				<CardMedia
					component="img"
					height="200"
					image={product.image}
					alt={product.name}
					sx={{ objectFit: 'contain' }}
				/>
				<CardContent>
					<Typography variant="subtitle2" color="text.secondary">
						{product.brand}
					</Typography>
					<Typography variant="h6" component="div" noWrap>
						{product.name}
					</Typography>
					<Typography variant="h6" color="primary">
						₹{product.price.toLocaleString()}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
						<Rating value={product.rating} precision={0.5} readOnly size="small" />
						<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
							({product.reviews})
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}