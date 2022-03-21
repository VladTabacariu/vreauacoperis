import Links from './Links.js';
import Image from 'next/image';
import logo from '../../public/logo/VreauAcoperis-LogoOrizontal.png';
import { ChevronDown } from 'tabler-icons-react';
import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
  } from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks';

const HEADER_HEIGHT = 92;
const useStyles = createStyles((theme) => ({
    inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    linkLabel: {
      marginRight: 5,
    },
  }));

const HeaderAction = () => {
    const { classes } = useStyles();
    const [opened, toggleOpened] = useBooleanToggle(false);
    const items = Links.map((link) => {
        const menuItems = link.links?.map((item) => (
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
        ));

        if (menuItems) {
        return (
            <Menu
            key={link.label}
            trigger="hover"
            delay={0}
            transitionDuration={0}
            placement="end"
            gutter={1}
            control={
                <a
                href={link.link}
                className={classes.link}
                onClick={(event) => event.preventDefault()}
                >
                <Center>
                    <span className={classes.linkLabel}>{link.label}</span>
                    <ChevronDown size={12} />
                </Center>
                </a>
            }
            >
            {menuItems}
            </Menu>
        );
        }

        return (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
        );
    });
    console.log(Links)
    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger
                    opened={opened}
                    onClick={() => toggleOpened()}
                    className={classes.burger}
                    size="sm"
                    />    
                    <Center>          
                        <Image src={logo} width={250} height={HEADER_HEIGHT} objectFit='contain' alt="Logo" />  
                    </Center>                      
                </Group>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Button radius="xl" sx={{ height: 30 }}>
                    Get early access
                </Button>
            </Container>
        </Header>
    )
}

export default HeaderAction