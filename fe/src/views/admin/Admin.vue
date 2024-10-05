<template>
    <div class="admin">
        <div class="admin-container">
            <div class="container-header">
                <router-link to="/admin" class="header-title">ADMIN PANEL</router-link>
                <AdminFilterNavbar />
            </div>
            <div class="container-content">
                <transition name="slide-fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import AdminFilterNavbar from '@/components/admin/AdminFilterNavbar';

    export default {
        name: 'Admin',
        metaInfo: {
            title: 'Admin - gooncasino.live'
        },
        components: {
            AdminFilterNavbar
        }
    }
</script>

<style scoped>
    .admin {
        width: 100%;
        padding: 55px 50px 45px 50px;
    }

    .admin .admin-container {
        width: 100%;
        padding: 30px;
        border-radius: 15px;
        background: #2B2339;
        /* position: relative;
        overflow: hidden; */
        border-bottom: 0.808px solid #dbba56;
        box-shadow: 0px 16.112px 50.349px 0px rgba(0, 0, 0, 0.25);
    }

    .admin .container-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .admin .container-header a.header-title {
        font-size: 32px;
        font-weight: 800;
        color: #fff
    }

    .admin .container-content {
        width: 100%;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #333;
    }

    .admin .container-content .slide-fade-enter-active {
        transition: all .3s ease-out;
    }

    .admin .container-content .slide-fade-enter {
        opacity: 0;
    }

    @media only screen and (max-width: 750px) {

        .admin {
            padding: 55px 10px 45px 10px;
        }

        .admin .admin-container {
            padding: 15px;
        }

    }

    @media only screen and (max-width: 650px) {

        .admin .container-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .admin .container-content {
            margin-top: 10px;
        }

    }
</style>
