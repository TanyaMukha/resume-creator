import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Rating,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Интерфейсы
interface Template {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  isFavorite: boolean;
}

interface Category {
  id: string;
  name: string;
}

// Моковые данные
const categories: Category[] = [
  { id: 'all', name: 'All Templates' },
  { id: 'professional', name: 'Professional' },
  { id: 'creative', name: 'Creative' },
  { id: 'modern', name: 'Modern' },
  { id: 'simple', name: 'Simple' },
  { id: 'academic', name: 'Academic' },
];

const templates: Template[] = [
  {
    id: 1,
    title: 'Professional Classic',
    description: 'Traditional professional template suitable for any industry. Clean and structured layout with emphasis on work experience.',
    image: '/api/placeholder/400/560',
    category: 'professional',
    tags: ['Corporate', 'Traditional', 'Experienced'],
    rating: 4.5,
    downloads: 1250,
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Creative Portfolio',
    description: 'Modern and creative design perfect for designers, artists, and creative professionals.',
    image: '/api/placeholder/400/560',
    category: 'creative',
    tags: ['Creative', 'Portfolio', 'Modern'],
    rating: 4.8,
    downloads: 980,
    isFavorite: true,
  },
  {
    id: 3,
    title: 'Minimal Modern',
    description: 'Clean and minimal design with a modern touch. Perfect for tech professionals and startups.',
    image: '/api/placeholder/400/560',
    category: 'modern',
    tags: ['Minimal', 'Tech', 'Clean'],
    rating: 4.6,
    downloads: 1540,
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Academic Research',
    description: 'Specialized template for academic professionals, researchers, and educators.',
    image: '/api/placeholder/400/560',
    category: 'academic',
    tags: ['Academic', 'Research', 'Education'],
    rating: 4.3,
    downloads: 750,
    isFavorite: false,
  },
  // Добавьте больше шаблонов по необходимости
];

// Компонент карточки шаблона
const TemplateCard: React.FC<{
  template: Template;
  onFavoriteToggle: (id: number) => void;
  onUse: (id: number) => void;
}> = ({ template, onFavoriteToggle, onUse }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={template.image}
        alt={template.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div">
            {template.title}
          </Typography>
          <Tooltip title={template.isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton 
              onClick={() => onFavoriteToggle(template.id)}
              color={template.isFavorite ? 'primary' : 'default'}
              size="small"
            >
              {template.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {template.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          {template.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Rating value={template.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {template.downloads} downloads
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<EditIcon />}
          onClick={() => onUse(template.id)}
        >
          Use Template
        </Button>
      </CardActions>
    </Card>
  );
};

// Основной компонент страницы
export const TemplatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Обработчики
  const handleFavoriteToggle = (id: number) => {
    // Здесь логика добавления/удаления из избранного
    console.log('Toggle favorite:', id);
  };

  const handleUseTemplate = (id: number) => {
    // Здесь логика использования шаблона
    console.log('Use template:', id);
  };

  // Фильтрация и сортировка шаблонов
  const filteredTemplates = templates
    .filter(template => 
      (selectedCategory === 'all' || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Resume Templates
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Choose from our professionally designed templates to create your perfect resume
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
              <MenuItem value="newest">Newest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <TemplateCard
              template={template}
              onFavoriteToggle={handleFavoriteToggle}
              onUse={handleUseTemplate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No templates found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search or filters to find what you're looking for
          </Typography>
        </Box>
      )}
    </Box>
  );
};
