import Link from 'next/link';
import ILinkButton from './interfaces/ILinkButton';
import classes from './scss/LinkButton.module.scss';

function LinkButton({url, children}: ILinkButton) {
  return (
    <Link href={url} className={classes.button}>
      {children}
    </Link>
  );
}

export default LinkButton;