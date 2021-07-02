import {
  Box,
  Card,
  CardMedia,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { IRickAndMorty } from '../types';

const statusIconStyle = {
    width: 15,
    height: 15,
    marginRight: 5,
};

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginRight: '0',
    },
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    height: 250,
    width: '49%',
    marginBottom: 10,
    marginRight: '1%',
    textAlign: 'left',
  },
  media: {
    height: '100%',
    width: 250,
    [theme.breakpoints.down('sm')]: {
        width: 150,
    },
  },
  online: {
    ...statusIconStyle,
    color: 'green',
  },
  offline: {
    ...statusIconStyle,
    color: 'red',
  },
  status: {
    display: 'flex',
    alignItems: 'center'
  },
}));

export default function MediaCard({ cardData }: { cardData: IRickAndMorty }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
        <Box display="flex" flexDirection="row" width="100%" height="100%">
            <Box height="100%">
                <CardMedia
                    className={classes.media}
                    image={cardData.image}
                    title={cardData.name}
                />
            </Box>
            <Box height="100%" pl={2}>
                <Box mb={1}>
                    <Typography gutterBottom variant="h5">
                        {cardData.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" className={classes.status}>
                        {
                            cardData.status === 'Alive' ?
                            <FiberManualRecordIcon className={classes.online}/> : 
                            <FiberManualRecordIcon className={classes.offline}/>
                        }
                        {cardData.status}: {cardData.species}
                    </Typography>
                </Box>
                <Box mb={1}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Last known location
                    </Typography>
                    <Typography variant="body2" component="p">
                        {cardData.location.name}
                    </Typography>
                </Box>
                <Box mb={2}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Origin:
                    </Typography>
                    <Typography variant="body2" component="p">
                        {cardData.origin.name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Card>
  );
};
 
