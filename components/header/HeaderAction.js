import Links from './Links.js'
import Image from 'next/image'
import logo from '../../public/logo/VreauAcoperis-LogoOrizontal.png'
import { ChevronDown } from '@heroicons/react/solid'
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
import { useBooleanToggle } from '@mantine/hooks'

const HeaderAction = () => {

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
                    className='block leading-none rounded-sm no-underline font-medium text-sm px-3 py-2'
                    onClick={(event) => event.preventDefault()}
                >
                    <Center>
                    <span className='mr-1'>{link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>
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
            className='block leading-none rounded-sm no-underline font-medium text-sm'
            onClick={(event) => event.preventDefault()}
            >
            {link.label}
            </a>
        );
    });
    console.log(Links)
    return (
        <Header height={80} sx={{ borderBottom: 0 }} mb={120}>
            <Container className="flex h-20 justify-between items-center" fluid>
                <Group className='w-56 h-full'>
                    <Burger 
                    opened={opened}
                    onClick={() => toggleOpened()}
                    className='sm:hidden'
                    size='sm'
                />      
                <Container className='w-full h-full relative'>          
                    <Image src={logo} layout="fill" objectFit='contain' alt="Logo" />  
                </Container>                      
                </Group>   
                <Group spacing={5} className=''>
                    {items}
                </Group> 
                <Button radius="xl" sx={{ height: 30 }} className='bg-green-500'>
                    Cat costa?
                </Button>    
            </Container>
        </Header>
    )
}

export default HeaderAction