'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">goodfood documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-a7c1368675bb207e0d7a102819e6d539c1673ff967dfb373f52fb4f9afd5708cfc181fdb90db76a621a4cdb7f1266ed3c6ee11b2f099b83e82bb9e5d1bc070cc"' : 'data-target="#xs-components-links-module-AuthModule-a7c1368675bb207e0d7a102819e6d539c1673ff967dfb373f52fb4f9afd5708cfc181fdb90db76a621a4cdb7f1266ed3c6ee11b2f099b83e82bb9e5d1bc070cc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-a7c1368675bb207e0d7a102819e6d539c1673ff967dfb373f52fb4f9afd5708cfc181fdb90db76a621a4cdb7f1266ed3c6ee11b2f099b83e82bb9e5d1bc070cc"' :
                                            'id="xs-components-links-module-AuthModule-a7c1368675bb207e0d7a102819e6d539c1673ff967dfb373f52fb4f9afd5708cfc181fdb90db76a621a4cdb7f1266ed3c6ee11b2f099b83e82bb9e5d1bc070cc"' }>
                                            <li class="link">
                                                <a href="components/CallbackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CallbackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-9d613ecf1bcf17c28f42f66c6bd90b232fb9168ee2f812a00939a92bb2a6465d4a4928c1b08f4e092ef156f9e4c5c235a4ee0040d8624820f223e78823fbeb44"' : 'data-target="#xs-components-links-module-ComponentsModule-9d613ecf1bcf17c28f42f66c6bd90b232fb9168ee2f812a00939a92bb2a6465d4a4928c1b08f4e092ef156f9e4c5c235a4ee0040d8624820f223e78823fbeb44"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-9d613ecf1bcf17c28f42f66c6bd90b232fb9168ee2f812a00939a92bb2a6465d4a4928c1b08f4e092ef156f9e4c5c235a4ee0040d8624820f223e78823fbeb44"' :
                                            'id="xs-components-links-module-ComponentsModule-9d613ecf1bcf17c28f42f66c6bd90b232fb9168ee2f812a00939a92bb2a6465d4a4928c1b08f4e092ef156f9e4c5c235a4ee0040d8624820f223e78823fbeb44"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DefaultModule.html" data-type="entity-link" >DefaultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' : 'data-target="#xs-components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' :
                                            'id="xs-components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' }>
                                            <li class="link">
                                                <a href="components/DefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FranchiseeModule.html" data-type="entity-link" >FranchiseeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' : 'data-target="#xs-components-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' :
                                            'id="xs-components-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' }>
                                            <li class="link">
                                                <a href="components/FranchiseeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' : 'data-target="#xs-injectables-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' :
                                        'id="xs-injectables-links-module-FranchiseeModule-95a5f8e7230dad5eea08f4d52f42c260c5a72e443fb4c2b3b6d7eb8976df85a6afb5022f73ab8def04f6361d2c47edeef3fe833c4584d17b21461587cfbb2cab"' }>
                                        <li class="link">
                                            <a href="injectables/FranchiseeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' : 'data-target="#xs-components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' :
                                            'id="xs-components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutsModule.html" data-type="entity-link" >LayoutsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrincipalModule.html" data-type="entity-link" >PrincipalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrincipalModule-f13e343b48aeb0684f0f34a3378fc24184fdbea434b6a9da9aa1b53853ed75eb7da164b2975733936644ecba0cdb4a1c52436a6848f99b2e60700128754eaef5"' : 'data-target="#xs-components-links-module-PrincipalModule-f13e343b48aeb0684f0f34a3378fc24184fdbea434b6a9da9aa1b53853ed75eb7da164b2975733936644ecba0cdb4a1c52436a6848f99b2e60700128754eaef5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrincipalModule-f13e343b48aeb0684f0f34a3378fc24184fdbea434b6a9da9aa1b53853ed75eb7da164b2975733936644ecba0cdb4a1c52436a6848f99b2e60700128754eaef5"' :
                                            'id="xs-components-links-module-PrincipalModule-f13e343b48aeb0684f0f34a3378fc24184fdbea434b6a9da9aa1b53853ed75eb7da164b2975733936644ecba0cdb4a1c52436a6848f99b2e60700128754eaef5"' }>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrincipalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrincipalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-f06e6bc6b10340a747043f9f7eba525954e5248c738e5a8c8872605735c0703872ffb08de996979d856ddb1b99329bdc4ab2f17d50c643f749f69769f9f9b13c"' : 'data-target="#xs-components-links-module-ProfileModule-f06e6bc6b10340a747043f9f7eba525954e5248c738e5a8c8872605735c0703872ffb08de996979d856ddb1b99329bdc4ab2f17d50c643f749f69769f9f9b13c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-f06e6bc6b10340a747043f9f7eba525954e5248c738e5a8c8872605735c0703872ffb08de996979d856ddb1b99329bdc4ab2f17d50c643f749f69769f9f9b13c"' :
                                            'id="xs-components-links-module-ProfileModule-f06e6bc6b10340a747043f9f7eba525954e5248c738e5a8c8872605735c0703872ffb08de996979d856ddb1b99329bdc4ab2f17d50c643f749f69769f9f9b13c"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecipeManagementModule.html" data-type="entity-link" >RecipeManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' : 'data-target="#xs-components-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' :
                                            'id="xs-components-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' }>
                                            <li class="link">
                                                <a href="components/IngredientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IngredientTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IngredientTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' : 'data-target="#xs-injectables-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' :
                                        'id="xs-injectables-links-module-RecipeManagementModule-08e108d77d778818e7e7f02ce439fe767b6377384780a913586c85281078b1ed383f0b52c047d9d6382b0a896d568db639022f89c811cc7173929323e8bfef99"' }>
                                        <li class="link">
                                            <a href="injectables/RecipeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' : 'data-target="#xs-components-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' :
                                            'id="xs-components-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' : 'data-target="#xs-injectables-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' :
                                        'id="xs-injectables-links-module-UsersModule-2ebe41fc7b86923dece7f42547915fdd3090e56c362ab3095857167f2618aa7e80093523a7afba81376b1d9389d842110a8cb59d3e52c3d853b19252dcf5d8b4"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FranchiseeService.html" data-type="entity-link" >FranchiseeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientService.html" data-type="entity-link" >IngredientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientTypeService.html" data-type="entity-link" >IngredientTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link" >RecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidebarService.html" data-type="entity-link" >SidebarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StringService.html" data-type="entity-link" >StringService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects.html" data-type="entity-link" >UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects-1.html" data-type="entity-link" >UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects-2.html" data-type="entity-link" >UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ApiTokenInterceptorService.html" data-type="entity-link" >ApiTokenInterceptorService</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/GlobalHttpInterceptorService.html" data-type="entity-link" >GlobalHttpInterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/FranchiseeGuard.html" data-type="entity-link" >FranchiseeGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsAuthenticatedGuard.html" data-type="entity-link" >IsAuthenticatedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsUnauthenticatedGuard.html" data-type="entity-link" >IsUnauthenticatedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccessTokenModel.html" data-type="entity-link" >AccessTokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Autorisation.html" data-type="entity-link" >Autorisation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Diner.html" data-type="entity-link" >Diner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Franchisee.html" data-type="entity-link" >Franchisee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FranchiseeRecipe.html" data-type="entity-link" >FranchiseeRecipe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Friday.html" data-type="entity-link" >Friday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ingredient.html" data-type="entity-link" >Ingredient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngredientState.html" data-type="entity-link" >IngredientState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngreType.html" data-type="entity-link" >IngreType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Lunch.html" data-type="entity-link" >Lunch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Monday.html" data-type="entity-link" >Monday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Picture.html" data-type="entity-link" >Picture</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecipeState.html" data-type="entity-link" >RecipeState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecipeType.html" data-type="entity-link" >RecipeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Saturday.html" data-type="entity-link" >Saturday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Schedule.html" data-type="entity-link" >Schedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sunday.html" data-type="entity-link" >Sunday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thursday.html" data-type="entity-link" >Thursday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tuesday.html" data-type="entity-link" >Tuesday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserState.html" data-type="entity-link" >UserState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wednesday.html" data-type="entity-link" >Wednesday</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});