import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { convertToTitleCase } from '../../common/helperComponent';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CommentCard({ obj }: any) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box style={{ display: 'flex', margin: '10px' }}>
            <Avatar sx={{ bgcolor: '#422afb', marginRight: '10px' }} aria-label="recipe">
                {/* {obj?.addedBy?.name} */}
                {convertToTitleCase(obj?.addedBy?.name).slice(0, 1)}
            </Avatar>

            <Card sx={{ maxWidth: 500 }}>
                {/* <CardHeader
                    title="Shrimp and Chorizo Paella"
                    subheader={time}
                /> */}
                <Box style={{ display: 'flex', margin: '5px',marginTop: '2px',marginBottom: '2px',alignItems:'center',justifyContent:'space-between' }}>
                    <Typography style={{ fontSize: '12px', fontWeight: 500 }}>
                        {convertToTitleCase(obj?.addedBy?.name)}
                    </Typography>
                    <Typography style={{ fontSize: '10px', fontWeight: 400, margin: '5px' }} >
                        {dayjs(obj?.createdAt).format('YYYY-MM-DD h:mm A')}
                    </Typography>
                </Box>
                <CardContent style={{ padding: '5px',paddingLeft: '10px',paddingRight: '10px',background: 'rgba(0, 0, 0, 0.04)' }}>
                    <Typography style={{ fontSize: '13px', fontWeight: 500 }}>
                        {obj?.message}
                    </Typography>
                </CardContent>
            </Card>
        </Box>

    );
}
