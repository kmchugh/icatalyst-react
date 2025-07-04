import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import getMimeType from '../../utilities/getMimeType';
import Image from '../Image';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      borderRadius : theme.shape.borderRadius,
    },
    image : {
      borderRadius : theme.shape.borderRadius,
      maxHeight: '100%',
    },
    video : {

    },
    audio : {

    }
  };
});

const Media = ({
  className,
  style,
  backgroundColor = 'transparent',
  defaultSrc,
  src,
  mimeType,
  onLoad,
  onError
})=>{
  const styles = useStyles();

  const [source, setSource] = useState(src);
  const [mediaType, setMediaType] = useState(mimeType && mimeType.split('/')[0].toLowerCase());

  const defaultSource = defaultSrc ? defaultSrc :
    (mostReadable(
      tinycolor(backgroundColor || 'transparent'), ['#fff', '#000'], {}
    ).toHexString() === '#000000' ?
      'assets/images/placeholders/image_dark.svg' :
      'assets/images/placeholders/image_light.svg'
    );


  useEffect(()=>{
    setSource(src ? src : defaultSource);
  }, [src]);

  useEffect(()=>{
    if (!mimeType) {
      const mime = getMimeType(source);
      setMediaType(mime && mime.split('/')[0].toLowerCase());
    }
  }, [source]);

  const validMimeTypes = [
    'audio',
    'video',
    'image'
  ];

  return (
    <div
      className={cxMui(styles.root, className)}
      style={style}
    >
      {(source && mediaType && mediaType === 'audio') && (
        <audio
          className={cxMui(styles.audio)}
          controls
          onCanPlay={(e)=>{
            if (source !== defaultSource) {
              onLoad && onLoad(e, source);
            }
          }}
          onError={(e)=>{
            if (source !== defaultSource) {
              setSource(defaultSource);
              setMediaType(getMimeType(defaultSource));
            }
            onError && onError(e, source);
          }}
        >
          <source
            src={source}
            type={getMimeType(source)}
          />
        </audio>
      )}

      {(source && mediaType && mediaType === 'video') && (
        <video
          className={cxMui(styles.video)}
          controls
          onCanPlay={(e)=>{
            if (source !== defaultSource) {
              onLoad && onLoad(e, source);
            }
          }}
          onError={(e)=>{
            if (source !== defaultSource) {
              setSource(defaultSource);
              setMediaType(getMimeType(defaultSource));
            }
            onError && onError(e, source);
          }}
        >
          <source src={source} type={getMimeType(source)} />
        </video>
      )}

      {(source && mediaType && mediaType === 'image') && (
        <div>Image Type</div>
      )}

      {(!source || !mediaType || validMimeTypes.indexOf(mediaType) < 0) && (
        <Image className={cxMui(styles.image)}/>
      )}

    </div>
  );
};

Media.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  backgroundColor : PropTypes.string,
  onError : PropTypes.func,
  onLoad : PropTypes.func,
  mimeType : PropTypes.string
};

export default Media;


// <video className={cxMui(classes.accordionVideo)} controls>
//   <source src={element.mediaurl} type='video/mp4' />
// </video>
